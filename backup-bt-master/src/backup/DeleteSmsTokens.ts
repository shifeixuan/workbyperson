import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()
export const deleteSmsTokens = async (event: unknown): Promise<Boolean> => {
  try {
    console.log('DWSI70000:トランザクション SMS紐づけの引き落としを開始します。')
    console.log('DWSI70000:OTPコードの引き落としを開始します。')
    console.log('DWSI70000:SMSトークンの引き落としを開始します。')
    const [transaction_sms_link, otp_code, sms_token] =
      await prisma.$transaction([
        prisma.$executeRaw`delete from transaction_sms_link where now()::timestamp > create_at + '30 min'`,
        prisma.$executeRaw`delete from otp_code oc where not exists (select 1 from transaction_sms_link tsl where oc.sms_id = tsl.sms_id)`,
        prisma.$executeRaw`delete from sms_token st where not exists (select 1 from transaction_sms_link tsl where st.sms_id = tsl.sms_id)`,
      ])
    console.log(
      'DWSI70001:トランザクション SMS紐づけの引き落としを終了します。(件数' +
        transaction_sms_link +
        '件)'
    )
    console.log(
      'DWSI70001:OTPコードの引き落としを終了します。(件数' + otp_code + '件)'
    )
    console.log(
      'DWSI70001:SMSトークンの引き落としを終了します。(件数' + sms_token + '件)'
    )
    return true
  } catch (err) {
    console.log(
      'DWSE70000:トランザクション SMS紐づけの引き落としが失敗しました。'
    )
    console.log('DWSE70000:OTPコードの引き落としが失敗しました。')
    console.log('DWSE70000:SMSトークンの引き落としが失敗しました。')
    console.log(err)
    return false
  }
}
