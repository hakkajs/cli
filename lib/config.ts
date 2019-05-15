import pkgConf from 'pkg-conf'
const debug = require('debug')('app:conf')
const namespace = 'hakka'
export interface PkgConf {
	namespace: string
	/**
	 * where files write to
	 */
	dist: string
	/**
	 * plugin dir
	 */
	pluginDir: string
	/**
	 * plugin prefix
	 */
	prefix: string
}
let conf: PkgConf
export const getConf = (): PkgConf => {
	if (conf) {
		return conf
	}

	conf = pkgConf.sync(namespace)
	// rc configuration does not support hakka config commands
	if (JSON.stringify(conf) === '{}') {
		conf = require('rc')(namespace, {})
	}
	conf = conf || {}
	if (!conf.dist) {
		conf.dist = 'src'
	}
	if (!conf.pluginDir) {
		conf.pluginDir = 'plugins'
	}
	conf.prefix = 'hakka-plugin-'
	conf.namespace = namespace
	debug('loading configurations: %o', conf)
	return conf
}
