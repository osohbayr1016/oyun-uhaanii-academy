import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middleware/authMiddleware';

const router = express.Router();
const prisma = new PrismaClient();

// Get all course categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await prisma.courseCategory.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' }
    });
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// Get all course levels
router.get('/levels', async (req, res) => {
  try {
    const levels = await prisma.courseLevel.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' }
    });
    res.json(levels);
  } catch (error) {
    console.error('Error fetching levels:', error);
    res.status(500).json({ error: 'Failed to fetch levels' });
  }
});

// Admin routes - require authentication
// Create new category
router.post('/categories', authenticateToken, async (req, res) => {
  try {
    const { name } = req.body;
    
    if (!name) {
      return res.status(400).json({ error: 'Category name is required' });
    }

    const category = await prisma.courseCategory.create({
      data: { name }
    });
    
    res.status(201).json(category);
  } catch (error: any) {
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Category with this name already exists' });
    }
    console.error('Error creating category:', error);
    res.status(500).json({ error: 'Failed to create category' });
  }
});

// Create new level
router.post('/levels', authenticateToken, async (req, res) => {
  try {
    const { name } = req.body;
    
    if (!name) {
      return res.status(400).json({ error: 'Level name is required' });
    }

    const level = await prisma.courseLevel.create({
      data: { name }
    });
    
    res.status(201).json(level);
  } catch (error: any) {
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Level with this name already exists' });
    }
    console.error('Error creating level:', error);
    res.status(500).json({ error: 'Failed to create level' });
  }
});

// Update category
router.put('/categories/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, isActive } = req.body;
    
    const category = await prisma.courseCategory.update({
      where: { id },
      data: { name, isActive }
    });
    
    res.json(category);
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ error: 'Failed to update category' });
  }
});

// Update level
router.put('/levels/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, isActive } = req.body;
    
    const level = await prisma.courseLevel.update({
      where: { id },
      data: { name, isActive }
    });
    
    res.json(level);
  } catch (error) {
    console.error('Error updating level:', error);
    res.status(500).json({ error: 'Failed to update level' });
  }
});

// Delete category (soft delete)
router.delete('/categories/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    await prisma.courseCategory.update({
      where: { id },
      data: { isActive: false }
    });
    
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ error: 'Failed to delete category' });
  }
});

// Delete level (soft delete)
router.delete('/levels/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    await prisma.courseLevel.update({
      where: { id },
      data: { isActive: false }
    });
    
    res.json({ message: 'Level deleted successfully' });
  } catch (error) {
    console.error('Error deleting level:', error);
    res.status(500).json({ error: 'Failed to delete level' });
  }
});

export default router; 