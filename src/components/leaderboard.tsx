/**
 * This code was started by v0 by Vercel.
 * @see https://v0.dev/t/zT2524Aolhw
 */

import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "~/components/ui/table";
import { redis } from "~/lib/redis";

export async function Leaderboard() {
  const players = await redis.player.getallandlastkey();
  return (
    <div className="flex h-full w-full flex-col md:min-w-[1000px] ">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold md:text-2xl">Leaderboard</h1>
        </div>
        <div className="rounded-lg border shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]"></TableHead>
                <TableHead className="max-w-[150px]">Name</TableHead>
                <TableHead className="md:table-cell">XP</TableHead>
                <TableHead className="md:table-cell">Games Played</TableHead>
                <TableHead>Kills</TableHead>
                <TableHead>Deaths</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {players.map(async (_player) => {
                const [id, player] = _player;
                const name = await (
                  await fetch(
                    `https://sessionserver.mojang.com/session/minecraft/profile/${id}`,
                  )
                )
                  .json()
                  .then((data) => data.name)
                  .catch(() => "");
                return (
                  <TableRow>
                    <TableCell>
                      <img
                        alt="Player image"
                        className="aspect-square rounded-md object-cover"
                        height="64"
                        src={"https://crafatar.com/avatars/" + id}
                        width="64"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{name}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {player.xp}
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
}
