import { Request, Response } from 'express';
import { Warehouse } from '../models/Warehouse.model';

export const getWarehouses = async (req: Request, res: Response): Promise<Response | any> => {
  try {
    const { search = '', sortField = 'warehouseName', sortOrder = 'asc', stateId, cityId } = req.query;

    // Create a regex for case-insensitive search
    const searchRegex = new RegExp(search as string, 'i');

    // Build query with optional filtering by state and city
    const query: any = {
      $or: [{ warehouseName: searchRegex }],
    };
    if (stateId) {
      query.state = stateId;
    }
    if (cityId) {
      query.city = cityId;
    }

    // Fetch warehouses with population of state and city fields
    const warehouses = await Warehouse.find(query)
      .populate('state', 'stateName stateCode')
      .populate('city', 'cityName cityCode')
      .sort({ [sortField as string]: sortOrder === 'asc' ? 1 : -1 });

    return res.json(warehouses);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch warehouses', error });
  }
};

export const getWarehouseById = async (req: Request, res: Response): Promise<Response | any> => {
  try {
    const { id } = req.params;

    const warehouse = await Warehouse.findById(id).populate('state', 'stateName stateCode').populate('city', 'cityName cityCode');
    if (!warehouse) {
      return res.status(404).json({ message: 'Warehouse not found' });
    }

    return res.json(warehouse);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch warehouse', error });
  }
};

export const addWarehouse = async (req: Request, res: Response): Promise<Response | any> => {
  try {
    const { warehouseName, stateId, cityId, status } = req.body;

    const newWarehouse = new Warehouse({ warehouseName, state: stateId, city: cityId, status });
    await newWarehouse.save();

    return res.status(201).json(newWarehouse);
  } catch (error) {
    return res.status(400).json({ message: 'Failed to add warehouse', error });
  }
};

export const updateWarehouse = async (req: Request, res: Response): Promise<Response | any> => {
  try {
    const { id } = req.params;
    const { warehouseName, stateId, cityId, status } = req.body;

    const updatedWarehouse = await Warehouse.findByIdAndUpdate(id, { warehouseName, state: stateId, city: cityId, status }, { new: true, runValidators: true });

    if (!updatedWarehouse) {
      return res.status(404).json({ message: 'Warehouse not found' });
    }

    return res.json(updatedWarehouse);
  } catch (error) {
    return res.status(400).json({ message: 'Failed to update warehouse', error });
  }
};

export const deleteWarehouse = async (req: Request, res: Response): Promise<Response | any> => {
  try {
    const { id } = req.params;

    const deletedWarehouse = await Warehouse.findByIdAndDelete(id);
    if (!deletedWarehouse) {
      return res.status(404).json({ message: 'Warehouse not found' });
    }

    return res.json({ message: 'Warehouse deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to delete warehouse', error });
  }
};
