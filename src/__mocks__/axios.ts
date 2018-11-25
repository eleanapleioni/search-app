const mockAxios: any = jest.genMockFromModule('axios');
mockAxios.create = jest.fn(() => mockAxios);
export default mockAxios;
// export default {
// 	get: jest.fn(() => Promise.resolve({ data: null })),
// };
