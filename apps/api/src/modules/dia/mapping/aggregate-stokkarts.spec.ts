import type { Stokkart } from '@akonbutik/dia-client';

import { aggregateStokkarts } from './aggregate-stokkarts';

const baseStokkart = (over: Partial<Stokkart>): Stokkart => ({
  stokkartkodu: 'X',
  aciklama: 'Ürün',
  durum: 'A',
  satisfiyati1: 100,
  ...over,
});

describe('aggregateStokkarts', () => {
  it('groups three stokkarts that share urungrubu into one product + three variants', () => {
    const result = aggregateStokkarts([
      baseStokkart({
        stokkartkodu: 'AKB-001-XS-BR',
        aciklama: 'Zarif Yazlık Takım — XS Kahverengi',
        urungrubu: 'AKB-001',
        markakodu: 'AKON',
        kategorikodu: 'KADIN',
        beden: 'XS',
        renk: 'Kahverengi',
        satisfiyati1: 65,
        b2c_depomiktari: 3,
      }),
      baseStokkart({
        stokkartkodu: 'AKB-001-S-BR',
        aciklama: 'Zarif Yazlık Takım — S Kahverengi',
        urungrubu: 'AKB-001',
        markakodu: 'AKON',
        kategorikodu: 'KADIN',
        beden: 'S',
        renk: 'Kahverengi',
        satisfiyati1: 65,
        b2c_depomiktari: 5,
      }),
      baseStokkart({
        stokkartkodu: 'AKB-001-M-BR',
        aciklama: 'Zarif Yazlık Takım — M Kahverengi',
        urungrubu: 'AKB-001',
        markakodu: 'AKON',
        kategorikodu: 'KADIN',
        beden: 'M',
        renk: 'Kahverengi',
        satisfiyati1: 65,
        b2c_depomiktari: 8,
      }),
    ]);
    expect(result.products).toHaveLength(1);
    expect(result.variants).toHaveLength(3);
    expect(result.unmatched).toHaveLength(0);
    const p = result.products[0]!;
    expect(p.parentKey).toBe('AKB-001');
    expect(p.parentKeySource).toBe('urungrubu');
    expect(p.nameTr).toBe('Zarif Yazlık Takım');
    expect(p.brandDiaKodu).toBe('AKON');
    expect(p.categoryDiaKodu).toBe('KADIN');
    expect(p.defaultPriceMinor).toBe(6500);
    expect(p.slug).toContain('zarif-yazlik-takim');
    expect(result.variants.map((v) => v.size)).toEqual(['XS', 'S', 'M']);
    expect(result.variants.map((v) => v.stockQty)).toEqual([3, 5, 8]);
  });

  it('falls back to urunmodelkodu when urungrubu is empty', () => {
    const result = aggregateStokkarts([
      baseStokkart({
        stokkartkodu: 'X-1',
        aciklama: 'Bluz Beyaz',
        urunmodelkodu: 'BLZ-100',
        beden: 'M',
        renk: 'Beyaz',
      }),
      baseStokkart({
        stokkartkodu: 'X-2',
        aciklama: 'Bluz Siyah',
        urunmodelkodu: 'BLZ-100',
        beden: 'M',
        renk: 'Siyah',
      }),
    ]);
    expect(result.products).toHaveLength(1);
    expect(result.products[0]?.parentKeySource).toBe('urunmodelkodu');
    expect(result.products[0]?.parentKey).toBe('BLZ-100');
  });

  it('falls back to name-prefix when neither urungrubu nor urunmodelkodu is present', () => {
    const result = aggregateStokkarts([
      baseStokkart({ stokkartkodu: 'A', aciklama: 'Pamuklu Tişört S Beyaz', beden: 'S', renk: 'Beyaz' }),
      baseStokkart({ stokkartkodu: 'B', aciklama: 'Pamuklu Tişört M Beyaz', beden: 'M', renk: 'Beyaz' }),
      baseStokkart({ stokkartkodu: 'C', aciklama: 'Pamuklu Tişört L Mavi', beden: 'L', renk: 'Mavi' }),
    ]);
    expect(result.products).toHaveLength(1);
    expect(result.products[0]?.parentKeySource).toBe('name-prefix');
    expect(result.products[0]?.parentKey).toBe('Pamuklu Tişört');
    expect(result.variants.map((v) => v.size)).toEqual(['S', 'M', 'L']);
    expect(result.variants.map((v) => v.color)).toEqual(['Beyaz', 'Beyaz', 'Mavi']);
  });

  it('emits a single-variant product with parentKeySource=self when only one stokkart in a group', () => {
    const result = aggregateStokkarts([
      baseStokkart({ stokkartkodu: 'SOLO-1', aciklama: 'Tekil Ürün — XS Kırmızı', urungrubu: 'SOLO' }),
    ]);
    expect(result.products).toHaveLength(1);
    expect(result.products[0]?.parentKeySource).toBe('self');
    expect(result.variants).toHaveLength(1);
  });

  it('lands stokkarts with no signal in `unmatched`', () => {
    const result = aggregateStokkarts([baseStokkart({ stokkartkodu: 'X', aciklama: 'X' })]);
    expect(result.products).toHaveLength(0);
    expect(result.unmatched).toHaveLength(1);
    expect(result.unmatched[0]?.stokkartkodu).toBe('X');
  });

  it('uses the modal brand/category when variants conflict', () => {
    const result = aggregateStokkarts([
      baseStokkart({
        stokkartkodu: 'A',
        aciklama: 'Ürün',
        urungrubu: 'P1',
        markakodu: 'AKON',
        kategorikodu: 'A',
      }),
      baseStokkart({
        stokkartkodu: 'B',
        aciklama: 'Ürün',
        urungrubu: 'P1',
        markakodu: 'AKON',
        kategorikodu: 'A',
      }),
      baseStokkart({
        stokkartkodu: 'C',
        aciklama: 'Ürün',
        urungrubu: 'P1',
        markakodu: 'NIKE',
        kategorikodu: 'B',
      }),
    ]);
    expect(result.products[0]?.brandDiaKodu).toBe('AKON');
    expect(result.products[0]?.categoryDiaKodu).toBe('A');
  });

  it('converts price to integer minor units (kuruş)', () => {
    const result = aggregateStokkarts([
      baseStokkart({
        stokkartkodu: 'A',
        urungrubu: 'P',
        satisfiyati1: 12.34,
      }),
    ]);
    expect(result.variants[0]?.priceMinor).toBe(1234);
  });
});
