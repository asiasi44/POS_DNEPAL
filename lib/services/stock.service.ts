export const stockService = {
  async stockIn(
    tx: any,
    {
      productId,
      userId,
      quantity,
      reason,
    }: { productId: string; userId: string; quantity: number; reason?: string },
  ) {
    const product = await tx.product.update({
      where: { id: productId },
      data: {
        currentStock: { increment: quantity },
      },
    });
    return tx.stockLog.create({
      data: {
        productId,
        userId,
        quantity,
        action: "STOCK_IN",
        balance: product.currentStock,
        reason,
      },
    });
  },
  async stockOut(
    tx: TransactionClient,
    {
      productId,
      userId,
      quantity,
      reason,
    }: { productId: string; userId: string; quantity: number; reason?: string },
  ) {
    const product = await tx.product.update({
      where: { id: productId },
      data: {
        currentStock: { decrement: quantity },
      },
    });
    return tx.stockLog.create({
      data: {
        productId,
        userId,
        quantity,
        action: "STOCK_OUT",
        balance: product.currentStock,
        reason,
      },
    });
  },
  async initializeStock(
    tx: TransactionClient,
    {
      productId,
      userId,
      quantity,
      reason,
    }: { productId: string; userId: string; quantity: number; reason?: string },
  ) {
    return tx.stockLog.create({
      data: {
        productId,
        userId,
        quantity,
        action: "INITIAL",
        balance: quantity,
        reason,
      },
    });
  },
};
