import { ManagerOptions, SocketOptions, io } from "socket.io-client";

const connectSocket = (
  namespace?: string,
  opts?: Partial<ManagerOptions & SocketOptions>
) => {
  const socket = io(
    process.env.NEXT_PUBLIC_APP_API_URL! + ("/" + (namespace || "")),
    opts
  );

  return socket;
};

export default connectSocket;
