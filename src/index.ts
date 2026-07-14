export * from "./auth";
export * from "./pricing";

export type FileEntry = {
  name: string;
  path: string;
  isDirectory: boolean;
};

export type GitChange = {
  path: string;
  status: string;
};

export type GitStatusData = {
  branch: string;
  changes: GitChange[];
  clean: boolean;
};

export type IDEEvent =
  | { type: "file_opened"; path: string }
  | { type: "cursor_moved"; line: number; column: number }
  | { type: "terminal_output"; data: string; stream?: "stdout" | "stderr" }
  | { type: "git_status"; changes: GitStatusData }
  | { type: "task_started"; id: string }
  | { type: "task_completed"; id: string }
  | {
      type: "build_complete";
      taskType: "build" | "test" | "task";
      taskName: string;
      status: "success" | "failure";
      exitCode: number;
      durationMs: number;
      output?: string;
    };

export type Command =
  | { type: "run_command"; command: string; cwd?: string }
  | { type: "open_file"; path: string }
  | { type: "read_file"; path: string }
  | { type: "list_directory"; path: string }
  | { type: "git_status" }
  | { type: "git_diff"; path?: string }
  | { type: "git_commit"; message: string }
  | { type: "git_push" }
  | { type: "start_task"; task: string }
  | { type: "agent_prompt"; prompt: string }
  | { type: "ping" };

export type Message =
  | { type: "event"; payload: IDEEvent }
  | { type: "command"; id?: string; payload: Command }
  | {
      type: "response";
      id?: string;
      success: boolean;
      data?: unknown;
      error?: string;
    };

export type ClientRole = "mobile" | "extension";

export type HandshakeMessage = {
  type: "handshake";
  role: ClientRole;
  token?: string;
};

export type IncomingMessage = Message | HandshakeMessage;

export const DEFAULT_PORT = 3847;
export const DEFAULT_HOST = "0.0.0.0";

export function parseMessage(raw: string): IncomingMessage | null {
  try {
    return JSON.parse(raw) as IncomingMessage;
  } catch {
    return null;
  }
}

export function serializeMessage(message: Message | HandshakeMessage): string {
  return JSON.stringify(message);
}
