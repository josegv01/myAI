import { OWNER_NAME, AI_NAME } from "./identity";

export const INITIAL_MESSAGE: string = `Hi! I'm ${AI_NAME}! The CAPYtalist capybara! and your guide towards financial freedom!`;
export const INITIAL_MESSAGE2: string = `Please enter your questions below!`;
export const DEFAULT_RESPONSE_MESSAGE: string = `Sorry, Capy is tired and is taking a nap. Please try again later.`;
export const WORD_CUTOFF: number = 8000; // Number of words until bot says it needs a break
export const WORD_BREAK_MESSAGE: string = `[WORD BREAK MESSAGE]`;
export const HISTORY_CONTEXT_LENGTH: number = 7; // Number of messages to use for context when generating a response
