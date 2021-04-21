
import { Vote } from "../entities/Vote";
import DataLoader from "dataloader";

export const createVoteLoader = () =>
  new DataLoader<{ postId: number; userId: number }, Vote | null>(
    async (keys) => {
      const votes = await Vote.findByIds(keys as any);
      const voteIdToVote: Record<string, Vote> = {};
      votes.forEach((updoot) => {
        voteIdToVote[`${updoot.userId}|${updoot.postId}`] = updoot;
      });

      return keys.map(
        (key) => voteIdToVote[`${key.userId}|${key.postId}`]
      );
    }
  );