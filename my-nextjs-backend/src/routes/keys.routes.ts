import { Router } from 'express';
import { Request, Response } from 'express';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();
const router = Router();

const createKeySchema = z.object({
  name: z.string().min(1).max(100)
});

router.get('/', async (req: Request, res: Response) => {
  try {
    const keys = await prisma.apiKey.findMany({
      select: {
        id: true,
        name: true,
        createdAt: true,
        isActive: true
      }
    });
    res.json(keys);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const { name } = createKeySchema.parse(req.body);
    const key = await prisma.apiKey.create({
      data: {
        key: crypto.randomBytes(32).toString('hex'),
        name,
        isActive: true
      }
    });
    res.status(201).json(key);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: 'Invalid request data' });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

export default router; 