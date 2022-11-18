import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()
export const deleteSendConfirmFailure = async (
  event: unknown
): Promise<Boolean> => {
  try {
    console.log('DWSI70000:送達確認失敗の引き落としを開始します。')
    const result: number =
      await prisma.$executeRaw`delete from send_confirm_failure where now()::timestamp > create_at + '1 hour'`
    console.log(
      'DWSI70001:送達確認失敗の引き落としを終了します。(件数' +
        result +
        '件)'
    )

    return true
  } catch (err) {
    console.log(
      'DWSE70000:送達確認失敗の引き落としが失敗しました。'
    )
    console.log(err)
    return false
  }
}
