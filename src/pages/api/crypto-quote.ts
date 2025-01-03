import { PluginErrorType, createErrorResponse } from '@lobehub/chat-plugin-sdk';

import { query } from '@/services/quote';
import { RequestData } from '@/type';

export const config = {
  runtime: 'edge',
};

export default async (req: Request) => {
  if (req.method !== 'POST') return createErrorResponse(PluginErrorType.MethodNotAllowed);

  const { symbol } = (await req.json()) as RequestData;

  const price = await query(symbol);

  return new Response(JSON.stringify({ price }));
};
