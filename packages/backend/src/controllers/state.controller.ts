import { Request, Response } from 'express';
import { State } from '../models/State.model';
import { City } from '../models/City.model';

export const getStates = async (req: Request, res: Response): Promise<Response | any> => {
  try {
    const { search = '', sortField = 'stateName', sortOrder = 'asc' } = req.query;
    console.log(sortField, sortOrder);

    // Create a regex for case-insensitive search
    const searchRegex = new RegExp(search as string, 'i');

    // Fetch states from the database with filtering and sorting
    const states = await State.find({
      $or: [{ stateName: searchRegex }, { stateCode: searchRegex }],
    }).sort({ [sortField as string]: sortOrder === 'asc' ? 1 : -1 });

    return res.json(states);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch states', error });
  }
};

export const getStateById = async (req: Request, res: Response): Promise<Response | any> => {
  try {
    const { id } = req.params;

    const state = await State.findById(id);
    if (!state) {
      return res.status(404).json({ message: 'State not found' });
    }

    return res.json(state);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch state', error });
  }
};

export const addState = async (req: Request, res: Response): Promise<Response | any> => {
  try {
    const { stateName, stateCode, status } = req.body;

    const newState = new State({ stateName, stateCode, status });
    await newState.save();

    return res.status(201).json(newState);
  } catch (error) {
    return res.status(400).json({ message: 'Failed to add state', error });
  }
};

export const updateState = async (req: Request, res: Response): Promise<Response | any> => {
  try {
    const { id } = req.params;
    const { stateName, stateCode, status } = req.body;

    const updatedState = await State.findByIdAndUpdate(id, { stateName, stateCode, status }, { new: true, runValidators: true });

    if (!updatedState) {
      return res.status(404).json({ message: 'State not found' });
    }

    return res.json(updatedState);
  } catch (error) {
    return res.status(400).json({ message: 'Failed to update state', error });
  }
};

export const deleteState = async (req: Request, res: Response): Promise<Response | any> => {
  try {
    const { id } = req.params;

    // Check if there are cities associated with this state
    const associatedCities = await City.find({ state: id });

    if (associatedCities.length > 0) {
      return res.status(400).json({
        message: 'State cannot be deleted because it is associated with existing cities.',
      });
    }

    // Proceed to delete if no associations found
    const state = await State.findByIdAndDelete(id);
    if (!state) {
      return res.status(404).json({ message: 'State not found' });
    }

    res.status(200).json({ message: 'State deleted successfully' });
  } catch (error) {
    console.error('Error deleting state:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
