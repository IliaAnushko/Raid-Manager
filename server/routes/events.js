import express from 'express';
import prisma from '../db.js';
import { authenticateToken, requireOfficer } from '../middleware/verifyToken.js';

const router = express.Router();

router.get('/', authenticateToken, async (req, res) => {
  try {
    const events = await prisma.event.findMany({
      include: {
        attendances: true
      },
      orderBy: { date: 'desc' }
    });

    const formattedEvents = events.map(event => {
      const attendanceMap = {};
      event.attendances.forEach(att => {
        attendanceMap[att.playerId] = att.status;
      });

      return {
        id: event.id,
        name: event.name,
        date: event.date,
        time: event.time,
        quantity: event.quantity,
        description: event.description,
        attendance: attendanceMap
      };
    });

    res.json(formattedEvents);
  } catch (error) {
    console.error('Ошибка получения событий:', error);
    res.status(500).json({ error: 'Не удалось загрузить события' });
  }
});

router.post('/', authenticateToken, requireOfficer, async (req, res) => {
  try {
    const { name, date, time, quantity, description } = req.body;

    if (!name || !date || !time) {
      return res.status(400).json({ error: 'Название, дата и время обязательны' });
    }

    const newEvent = await prisma.event.create({
      data: {
        name,
        date,
        time,
        quantity: quantity ? parseInt(quantity) : null,
        description: description || ''
      }
    });

    res.status(201).json({
      ...newEvent,
      attendance: {}
    });
  } catch (error) {
    console.error('Ошибка создания события:', error);
    res.status(500).json({ error: 'Не удалось создать событие' });
  }
});

router.put('/:id', authenticateToken, requireOfficer, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, date, time, quantity, description } = req.body;

    const updatedEvent = await prisma.event.update({
      where: { id },
      data: {
        name,
        date,
        time,
        quantity: quantity ? parseInt(quantity) : null,
        description
      }
    });

    res.json(updatedEvent);
  } catch (error) {
    console.error('Ошибка обновления события:', error);
    res.status(500).json({ error: 'Не удалось обновить событие' });
  }
});

router.delete('/:id', authenticateToken, requireOfficer, async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.event.delete({
      where: { id }
    });

    res.json({ message: 'Событие успешно удалено' });
  } catch (error) {
    console.error('Ошибка удаления события:', error);
    res.status(500).json({ error: 'Не удалось удалить событие' });
  }
});

router.put('/:id/attendance', authenticateToken, requireOfficer, async (req, res) => {
  try {
    const eventId = req.params.id;
    const { playerId, status } = req.body; // status: 'present' | 'absent' | 'rejected'

    if (!playerId || !status) {
      return res.status(400).json({ error: 'playerId и status обязательны' });
    }

    const attendance = await prisma.attendance.upsert({
      where: {
        eventId_playerId: {
          eventId,
          playerId: parseInt(playerId)
        }
      },
      update: { status },
      create: {
        eventId,
        playerId: parseInt(playerId),
        status
      }
    });

    res.json(attendance);
  } catch (error) {
    console.error('Ошибка отметки явки:', error);
    res.status(500).json({ error: 'Не удалось сохранить статус явки' });
  }
});

export default router;