import tinymce from 'tinymce'

import 'tinymce/skins/content/default/content.css'
import 'tinymce/skins/ui/oxide/skin.css'
import 'tinymce/skins/ui/oxide/content.css'

import 'tinymce/themes/silver'
import 'tinymce/icons/default'
import 'tinymce/models/dom'

import zhCN from '@/langs/zh_CN'

tinymce.addI18n('zh_CN', zhCN)

export default tinymce
