import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()
export const deleteUserIdPhoneNumberDisagreement = async (
  event: unknown
): Promise<Boolean> => {
  try {
    console.log(
      'DWSI70000:SMS電話番号不一致の引き落としを開始します。'
    )
    // user_id_phone_number_disagreement削除
    const result: number =
      await prisma.$executeRaw`delete from user_id_phone_number_disagreement where now()::timestamp > create_at + '1 day'`
    console.log(
      'DWSI70001:SMS電話番号不一致の引き落としを終了します。(件数' +
        result +
        '件)'
    )
    return true
  } catch (err) {
    console.log(
      'DWSE70000:SMS電話番号不一致の引き落としが失敗しました。'
    )
    console.log(err)
    return false
  }
}
