import express from 'express';

import {
  getLeads,
  createLead,
  updateLead,
  deleteLead,
} from '../controllers/leadController';

import { protect } from '../middlewares/authMiddleware';

import { allowRoles } from '../middlewares/roleMiddleware';

const router = express.Router();

// PROTECT ALL ROUTES
router.use(protect);

// GET ALL LEADS
router.get('/', getLeads);

// CREATE LEAD
router.post('/', createLead);

// UPDATE LEAD -> ADMIN ONLY
router.put(
  '/:id',
  allowRoles('admin'),
  updateLead
);

// DELETE LEAD -> ADMIN ONLY
router.delete(
  '/:id',
  allowRoles('admin'),
  deleteLead
);

export default router;