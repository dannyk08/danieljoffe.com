const mockNextTransitionRouter = {
  useTransitionRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
  })),
};

module.exports = mockNextTransitionRouter;
