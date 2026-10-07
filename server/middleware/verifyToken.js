import jwt from 'jsonwebtoken';

export function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; 

  if (!token) {
    return res.status(401).json({ error: 'Доступ запрещен: требуется авторизация' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Недействительный или истекший токен' });
  }
}

export function requireOfficer(req, res, next) {
  if (req.user?.role !== 'ADMIN' && req.user?.role !== 'OFFICER') {
    return res.status(403).json({ error: 'Недостаточно прав: действие доступно только офицерам' });
  }
  next();
}

export function requireAdmin(req, res, next) {
  if (req.user?.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Доступно только главному администратору' });
  }
  next();
}