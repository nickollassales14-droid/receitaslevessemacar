import { describe, expect, it } from "vitest";
import { nextLikeState } from "@/lib/review-likes";

describe("curtidas de avaliações", () => {
  it("curtir uma vez incrementa o contador em 1", () => {
    expect(nextLikeState(false, 0)).toEqual({ liked: true, count: 1 });
  });

  it("curtir de novo desfaz a curtida, sem duplicar", () => {
    const uma = nextLikeState(false, 0);
    expect(nextLikeState(uma.liked, uma.count)).toEqual({ liked: false, count: 0 });
  });

  it("o contador nunca fica negativo", () => {
    expect(nextLikeState(true, 0).count).toBe(0);
  });
});
