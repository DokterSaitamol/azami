import { isNumber } from '../lib/others.js'

const cooldown = 60000

let handler = async (m, { args, usedPrefix, command, isPrems, isAdmin, isOwner }) => {
	if (m.chat.includes('120363041604217979') && !isOwner) return m.reply(`[ hehe ]`)
	if (!args[0]) return m.reply(`Format : ${usedPrefix + command} <timer>\n1 = 1 menit\n5 = 5 menit ... dst.\n\nContoh : *${usedPrefix + command} 10*`)
	if (isPrems || isAdmin || isOwner) {
		const total = Math.floor(isNumber(args[0]) ? Math.min(Math.max(parseInt(args[0]), 1), Number.MAX_SAFE_INTEGER) : 1) * 1
		if (total > 200 && !isPrems) return m.reply(`_... >> not premium ..._\n[!] Maksimal ${command} : 200 menit.`)
		if (total > 400 && !isOwner) return m.reply(`[!] Maksimal ${command} : 400 menit.`)
		let chat = global.db.data.chats[m.chat]
		chat.isBanned = true
		chat.lastmute = new Date * 1
		chat.mutecd = cooldown * total
		m.reply(`Bot senyap selama *${total} menit!*`)
	} else return m.reply(`*「ADMIN / PREM / OWNER ONLY」*`)
}

handler.menugroup = ['mute']
handler.menuowner = ['mute']
handler.tagsgroup = ['group']
handler.tagsowner = ['owner']
handler.command = /^(mute|senyap)$/i

handler.cooldown = cooldown

export default handler