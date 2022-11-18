import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()
export const deleteTransactionId = async (event: unknown): Promise<Boolean> => {
  try {
    console.log('DWSI70000:トランザクションIDの引き落としを開始します。')
    // TRANSACTION_ID削除
    let result: number =
      await prisma.$executeRaw`delete from TRANSACTION_ID where now()::timestamp > create_at + '1 hour'`
    console.log(
      'DWSI70001:トランザクションIDの引き落としを終了します。(件数' + result + '件)'
    )
    return true
  } catch (err) {
    console.log('DWSE70000:トランザクションIDの引き落としが失敗しました。')
    console.log(err)
    return false
  }
}
