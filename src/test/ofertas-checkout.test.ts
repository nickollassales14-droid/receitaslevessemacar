import { describe, expect, it } from "vitest";

import { ofertas } from "@/content/oferta";

const byId = (id: string) => ofertas.find((o) => o.id === id);

describe("Ofertas: preços e checkouts", () => {
  it("mostra R$ 14,90 e o checkout básico no Pacote Essencial", () => {
    const essencial = byId("essencial");

    expect(essencial?.preco).toBe("R$ 14,90");
    expect(essencial?.link).toBe("https://pay.cakto.com.br/33wqmvw_1276577");
  });

  it("mostra R$ 24,90 e o checkout completo no Pacote Completo", () => {
    const completo = byId("completo");

    expect(completo?.preco).toBe("R$ 24,90");
    expect(completo?.link).toBe("https://pay.cakto.com.br/yyp4n7z_1276637");
  });

  it("não deixa nenhum preço ou link de compra provisório", () => {
    for (const o of ofertas) {
      expect(o.preco).not.toMatch(/00,00/);
      expect(o.link).toMatch(/^https:\/\/pay\.cakto\.com\.br\//);
    }
  });
});
