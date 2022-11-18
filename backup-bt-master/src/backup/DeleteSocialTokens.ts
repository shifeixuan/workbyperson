import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()
export const deleteSocialTokens = async (event: unknown): Promise<Boolean> => {
  try {
    console.log('DWSI70000:トランザクション ソーシャル紐づけの引き落としを開始します。')
    console.log('DWSI70000:subject_claimの引き落としを開始します。')
    console.log('DWSI70000:ソーシャルトークンの引き落としを開始します。')
    console.log('DWSI70000:認可コードの引き落としを開始します。')
    console.log('DWSI70000:IDP属性の引き落としを開始します。')
    const [
      transaction_social_link,
      subject_claim,
      social_token,
      authorization_code,
      idp_attribute,
    ] = await prisma.$transaction([
      prisma.$executeRaw`delete from transaction_social_link where now()::timestamp > create_at + '30 min'`,
      prisma.$executeRaw`delete from subject_claim sc where not exists (select 1 from transaction_social_link tsl where sc.social_id = tsl.social_id)`,
      prisma.$executeRaw`delete from social_token st where not exists (select 1 from transaction_social_link tsl where st.social_id = tsl.social_id)`,
      prisma.$executeRaw`delete from authorization_code ac where not exists (select 1 from transaction_social_link tsl where ac.social_id = tsl.social_id)`,
      prisma.$executeRaw`delete from idp_attribute ia where not exists (select 1 from transaction_social_link tsl where ia.social_id = tsl.social_id)`,
    ])
    console.log(
      'DWSI70001:トランザクション ソーシャル紐づけの引き落としを終了します。(件数' +
        transaction_social_link +
        '件)'
    )
    console.log(
      'DWSI70001:subject claimの引き落としを終了します。(件数' +
        subject_claim +
        '件)'
    )
    console.log(
      'DWSI70001:ソーシャルトークンの引き落としを終了します。(件数' +
        social_token +
        '件)'
    )
    console.log(
      'DWSI70001:認可コードの引き落としを終了します。(件数' +
        authorization_code +
        '件)'
    )
    console.log(
      'DWSI70001:IDP属性の引き落としを終了します。(件数' +
        idp_attribute +
        '件)'
    )
    return true
  } catch (err) {
    console.log(
      'DWSE70000:トランザクション ソーシャル紐づけの引き落としが失敗しました。'
    )
    console.log('DWSE70000:subject claimの引き落としが失敗しました。')
    console.log('DWSE70000:ソーシャルトークンの引き落としが失敗しました。')
    console.log(
      'DWSE70000:認可コードの引き落としが失敗しました。'
    )
    console.log('DWSE70000:IDP属性の引き落としが失敗しました。')
    console.log(err)
    return false
  }
}
