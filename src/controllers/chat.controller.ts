import { Request, Response } from 'express';
import * as chatService from '../services/chat.service';

export async function createChat(req: Request, res: Response) {
  const { userId, firstMessage } = req.body;

  try {
    const chat = await chatService.createChat(userId, firstMessage);
    res.status(201).json(chat);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
    res.status(500).json({ error: errorMessage });
  }
}

export async function getChatById(req: Request, res: Response) {
  try {
    const chat = await chatService.getChatById(req.params.id);
    res.json(chat);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
    res.status(500).json({ error: errorMessage });
  }
}

export async function getChatsByUserId(req: Request, res: Response) {
  try {
    const chats = await chatService.getChatsByUserId(req.params.userId);
    res.json(chats);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
    res.status(500).json({ error: errorMessage });
  }
}

export const deleteChat = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await chatService.deleteChat(id);
    return res.status(200).json({ message: 'Chat deleted successfully.' });
  } catch (error: any) {
    return res.status(500).json({ message: 'Failed to delete chat.', error: error.message });
  }
};