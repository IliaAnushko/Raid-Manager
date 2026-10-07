import express from 'express';
import prisma from '../db.js';
import { authenticateToken, requireOfficer } from '../middleware/verifyToken.js';

const router = express.Router();

router.get('/', authenticateToken, async (req, res) => {
  try {
    const players = await prisma.player.findMany({
      orderBy: { createdAt: 'desc' }
    });

    const formattedPlayers = players.map(player => ({
      ...player,
      role: typeof player.roles === 'string' ? JSON.parse(player.roles) : player.roles
    }));

    res.json(formattedPlayers);
  } catch (error) {
    console.error('Ошибка получения игроков:', error);
    res.status(500).json({ error: 'Не удалось загрузить игроков' });
  }
});

router.post('/', authenticateToken, requireOfficer, async (req, res) => {
  try {
    const { name, discord, characterClass, role, skill } = req.body;

    if (!name || !characterClass) {
      return res.status(400).json({ error: 'Имя и класс персонажа обязательны' });
    }

    const newPlayer = await prisma.player.create({
      data: {
        name,
        discord: discord || '',
        characterClass,
        roles: JSON.stringify(Array.isArray(role) ? role : (role ? [role] : [])),
        skill: skill || '',
        status: 'active'
      }
    });

    res.status(201).json({
      ...newPlayer,
      role: JSON.parse(newPlayer.roles)
    });
  } catch (error) {
    console.error('Ошибка создания игрока:', error);
    res.status(500).json({ error: 'Не удалось сохранить игрока' });
  }
});

router.put('/:id', authenticateToken, requireOfficer, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name, discord, characterClass, role, skill, status } = req.body;

    const updatedPlayer = await prisma.player.update({
      where: { id },
      data: {
        name,
        discord,
        characterClass,
        roles: JSON.stringify(Array.isArray(role) ? role : (role ? [role] : [])),
        skill,
        status
      }
    });

    res.json({
      ...updatedPlayer,
      role: JSON.parse(updatedPlayer.roles)
    });
  } catch (error) {
    console.error('Ошибка обновления игрока:', error);
    res.status(500).json({ error: 'Не удалось обновить данные игрока' });
  }
});

router.delete('/:id', authenticateToken, requireOfficer, async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    await prisma.player.delete({
      where: { id }
    });

    res.json({ message: 'Игрок успешно удален' });
  } catch (error) {
    console.error('Ошибка удаления игрока:', error);
    res.status(500).json({ error: 'Не удалось удалить игрока' });
  }
});

export default router;