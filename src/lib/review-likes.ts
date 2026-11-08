// Lógica pura do botão de curtir das avaliações.
// Garante que cada visitante alterna entre curtido/não curtido sem duplicar curtidas.
export function nextLikeState(liked: boolean, count: number): { liked: boolean; count: number } {
  return liked
    ? { liked: false, count: Math.max(0, count - 1) }
    : { liked: true, count: count + 1 };
}
