import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()
export const deleteBackupTokens = async (event: unknown): Promise<Boolean> => {
  try {
    console.log('DWSI70000:バックアップトークンの引き落としを開始します。')
    console.log('DWSI70000:ログインデバイスの引き落としを開始します。')
    const [backup_token, login_device] = await prisma.$transaction([
      prisma.$executeRaw`delete from backup_token where (is_deleted = true and now()::timestamp > update_at + '1 month') or (now()::timestamp > valid_period + '1 month')`,
      prisma.$executeRaw`delete from login_device ld where not exists (select 1 from backup_token bt where ld.backup_token_id = bt.backup_token_id)`,
    ])

    console.log(
      'DWSI70001:バックアップトークンの引き落としを終了します。(件数' +
        backup_token +
        '件)'
    )
    console.log(
      'DWSI70001:ログインデバイスの引き落としを終了します。(件数' +
        login_device +
        '件)'
    )
    return true
  } catch (err) {
    console.log('DWSE70000:バックアップトークンの引き落としが失敗しました。')
    console.log('DWSE70000:ログインデバイスの引き落としが失敗しました。')
    console.log(err)
    return false
  }
}
