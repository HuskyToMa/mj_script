#!/usr/bin/env node
const argvStore = require('argv_store');
const services = require('./services/cli');
const addView = require('./add');
const {
    reactInit,
    addPlugins,
} = require('./cli');
const getOriginPlugins = require('./services/cli/sync');
const serverConfig = require('./serveConfig');
const packageJson = require('./package.json');

const program = new argvStore();

program
    .version(packageJson.version)
    .command('create', '初始化', reactInit)
        .options('-r --rename', '[yourname] 重命名')
    .command('addPlugins', '添加插件', addPlugins)
        .options('-m --methods', '添加插件/框架')
        .options('-u --url', '从远处仓库拉取')
        .options('-n --npm', '从npm拉取')
        .options('-c --current', '从当前目录复制')
    .command('add', '添加新页面', addView)
        .options('-t --template', '添加新的页面模板')
        .options('-s --select', '直接选择需要添加的页面模板')
    .command('services', '启动服务', services)
        .options('stop', '关闭服务')
        .options('restart', '重启服务')
        .options('list', '获取服务列表')
        .options('delete', '删除服务')
    .command('sync', '同步服务器的插件与框架', getOriginPlugins)
        .options('-ip', '重新设置获取服务器的ip地址')
        .options('-port', '端口号')
    .command('config', '配置', serverConfig)
        .options('set', '设置')
    .parse();