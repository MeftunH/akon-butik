// Lives in its own file so DiaModule can import DiaSyncService (which
// injects this token) without creating a circular import via dia.module.
export const DIA_CLIENT = Symbol('DIA_CLIENT');
