import { Request, Response } from 'express';
import Lead from '../models/Lead';

// GET ALL LEADS
export const getLeads = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      status,
      source,
      search,
      sort = 'latest',
      page = 1,
    } = req.query;

    const query: any = {};

    // FILTERS
    if (status) {
      query.status = status;
    }

    if (source) {
      query.source = source;
    }

    // SEARCH
    if (search) {
      query.$or = [
        {
          name: {
            $regex: search,
            $options: 'i',
          },
        },
        {
          email: {
            $regex: search,
            $options: 'i',
          },
        },
      ];
    }

    // PAGINATION
    const limit = 10;
    const skip =
      (Number(page) - 1) * limit;

    // FETCH LEADS
    const leads = await Lead.find(query)
      .sort({
        createdAt:
          sort === 'latest' ? -1 : 1,
      })
      .skip(skip)
      .limit(limit);

    // TOTAL COUNT
    const total =
      await Lead.countDocuments(query);

    res.status(200).json({
      success: true,
      leads,
      total,
      currentPage: Number(page),
      totalPages: Math.ceil(
        total / limit
      ),
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: 'Failed to fetch leads',
    });
  }
};

// CREATE LEAD
export const createLead = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const lead = await Lead.create(
      req.body
    );

    res.status(201).json({
      success: true,
      lead,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: 'Failed to create lead',
    });
  }
};

// UPDATE LEAD
export const updateLead = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const lead =
      await Lead.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    if (!lead) {
      res.status(404).json({
        success: false,
        message: 'Lead not found',
      });

      return;
    }

    res.status(200).json({
      success: true,
      lead,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: 'Failed to update lead',
    });
  }
};

// DELETE LEAD
export const deleteLead = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const lead =
      await Lead.findByIdAndDelete(
        req.params.id
      );

    if (!lead) {
      res.status(404).json({
        success: false,
        message: 'Lead not found',
      });

      return;
    }

    res.status(200).json({
      success: true,
      message: 'Lead deleted successfully',
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: 'Failed to delete lead',
    });
  }
};