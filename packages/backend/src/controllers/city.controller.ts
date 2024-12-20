import { Request, Response } from 'express';
import { City } from '../models/City.model';
import { Warehouse } from '../models/Warehouse.model';

export const getCities = async (req: Request, res: Response): Promise<Response | any> => {
  try {
    const { search = '', sortField = 'cityName', sortOrder = 'asc', stateId } = req.query;

    // Create a regex for case-insensitive search
    const searchRegex = new RegExp(search as string, 'i');

    // Build query with optional state filtering
    const query: any = {
      $or: [{ cityName: searchRegex }, { cityCode: searchRegex }],
    };
    if (stateId) {
      query.state = stateId;
    }

    // Fetch cities from the database with filtering, sorting, and population of the state field
    const cities = await City.find(query)
      .populate('state', 'stateName stateCode') // Populate state field with specific fields
      .sort({ [sortField as string]: sortOrder === 'asc' ? 1 : -1 });

    return res.json(cities);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch cities', error });
  }
};

export const getCityById = async (req: Request, res: Response): Promise<Response | any> => {
  try {
    const { id } = req.params;

    const city = await City.findById(id).populate('state', 'stateName stateCode');
    if (!city) {
      return res.status(404).json({ message: 'City not found' });
    }

    return res.json(city);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch city', error });
  }
};

export const addCity = async (req: Request, res: Response): Promise<Response | any> => {
  try {
    const { cityName, cityCode, stateId, status } = req.body;

    const newCity = new City({ cityName, cityCode, state: stateId, status });
    await newCity.save();

    return res.status(201).json(newCity);
  } catch (error) {
    return res.status(400).json({ message: 'Failed to add city', error });
  }
};

export const updateCity = async (req: Request, res: Response): Promise<Response | any> => {
  try {
    const { id } = req.params;
    const { cityName, cityCode, stateId, status } = req.body;

    const updatedCity = await City.findByIdAndUpdate(id, { cityName, cityCode, state: stateId, status }, { new: true, runValidators: true });

    if (!updatedCity) {
      return res.status(404).json({ message: 'City not found' });
    }

    return res.json(updatedCity);
  } catch (error) {
    return res.status(400).json({ message: 'Failed to update city', error });
  }
};

export const deleteCity = async (req: Request, res: Response): Promise<Response | any> => {
  try {
    const { id } = req.params;

    // Check if there are cities associated with this state
    const associatedWarehouses = await Warehouse.find({ city: id });

    if (associatedWarehouses.length > 0) {
      return res.status(400).json({
        message: 'City cannot be deleted because it is associated with existing warehouses.',
      });
    }

    const deletedCity = await City.findByIdAndDelete(id);
    if (!deletedCity) {
      return res.status(404).json({ message: 'City not found' });
    }

    return res.json({ message: 'City deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to delete city', error });
  }
};
