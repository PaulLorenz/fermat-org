/*jshint -W069 */
var compSrv = require('./services/comp');
var CompMdl = require('./models/comp');
var compDevSrv = require('./services/compDev');
var CompDevMdl = require('./models/compDev');
var statusSrv = require('./services/status');
var StatusMdl = require('./models/status');
/**
 * [getComps description]
 *
 * @method getComps
 *
 * @param  {Function} callback [description]
 *
 * @return {[type]}   [description]
 */
exports.getComps = function (callback) {
    'use strict';
    try {
        compSrv.findAllComps({}, {}, function (err, comps) {
            if (err) {
                return callback(err, null);
            }
            return callback(null, comps);
        });
    } catch (err) {
        return callback(err, null);
    }
};
/**
 * [findComps description]
 *
 * @method findComps
 *
 * @param  {Function} callback [description]
 *
 * @return {[type]}   [description]
 */
exports.findComps = function (callback) {
    'use strict';
    try {
        compSrv.findComps({}, {}, function (err, comps) {
            if (err) {
                return callback(err, null);
            }
            return callback(null, comps);
        });
    } catch (err) {
        return callback(err, null);
    }
};
/**
 * [insOrUpdComp description]
 *
 * @method insOrUpdComp
 *
 * @param  {[type]}     _platfrm_id [description]
 * @param  {[type]}     _suprlay_id [description]
 * @param  {[type]}     _layer_id   [description]
 * @param  {[type]}     name        [description]
 * @param  {[type]}     type        [description]
 * @param  {[type]}     description [description]
 * @param  {[type]}     difficulty  [description]
 * @param  {[type]}     code_level  [description]
 * @param  {[type]}     repo_dir    [description]
 * @param  {[type]}     scrnshts     [description]
 * @param  {[type]}     found       [description]
 * @param  {Function}   callback    [description]
 *
 * @return {[type]}     [description]
 */
exports.insOrUpdComp = function (_platfrm_id, _suprlay_id, _layer_id, name, type, description, difficulty, code_level, repo_dir, scrnshts, found, callback) {
    'use strict';
    try {
        var find_obj = {
            '$and': []
        };
        if (_platfrm_id) {
            find_obj['$and'].push({
                '_platfrm_id': _platfrm_id
            });
        }
        if (_suprlay_id) {
            find_obj['$and'].push({
                '_suprlay_id': _suprlay_id
            });
        }
        if (_layer_id) {
            find_obj['$and'].push({
                '_layer_id': _layer_id
            });
        }
        if (name) {
            find_obj['$and'].push({
                'name': name
            });
        }
        compSrv.findComp(find_obj, function (err_comp, res_comp) {
            if (err_comp) {
                return callback(err_comp, null);
            } else if (res_comp) {
                var set_obj = {};
                if (type && type !== res_comp.type) {
                    set_obj.type = type;
                    res_comp.type = type;
                }
                if (description && description !== res_comp.description) {
                    set_obj.description = description;
                    res_comp.description = description;
                }
                if (difficulty && difficulty !== res_comp.difficulty) {
                    set_obj.difficulty = difficulty;
                    res_comp.difficulty = difficulty;
                }
                if (code_level && code_level !== res_comp.code_level) {
                    set_obj.code_level = code_level;
                    res_comp.code_level = code_level;
                }
                if (repo_dir && repo_dir !== res_comp.repo_dir) {
                    set_obj.repo_dir = repo_dir;
                    res_comp.repo_dir = repo_dir;
                }
                set_obj.scrnshts = scrnshts;
                res_comp.scrnshts = scrnshts;
                if (found && found !== res_comp.found) {
                    set_obj.found = found;
                    res_comp.found = found;
                }
                if (Object.keys(set_obj).length > 0) {
                    compSrv.updateCompById(res_comp._id, set_obj, function (err_upd, res_upd) {
                        if (err_upd) {
                            return callback(err_upd, null);
                        }
                        return callback(null, res_comp);
                    });
                } else {
                    return callback(null, res_comp);
                }
            } else {
                var comp = new CompMdl(_platfrm_id, _suprlay_id, _layer_id, name, type, description, difficulty, code_level, repo_dir, scrnshts);
                compSrv.insertComp(comp, function (err_ins, res_ins) {
                    if (err_ins) {
                        return callback(err_ins, null);
                    }
                    return callback(null, res_ins);
                });
            }
        });
    } catch (err) {
        return callback(err, null);
    }
};
/**
 * [insOrUpdCompDev description]
 *
 * @method insOrUpdCompDev
 *
 * @param  {[type]}        _comp_id [description]
 * @param  {[type]}        _dev_id  [description]
 * @param  {[type]}        role     [description]
 * @param  {[type]}        scope    [description]
 * @param  {[type]}        percnt   [description]
 * @param  {Function}      callback [description]
 *
 * @return {[type]}        [description]
 */
exports.insOrUpdCompDev = function (_comp_id, _dev_id, role, scope, percnt, callback) {
    'use strict';
    try {
        var find_obj = {
            '$and': []
        };
        if (_comp_id) {
            find_obj['$and'].push({
                '_comp_id': _comp_id
            });
        }
        if (_dev_id) {
            find_obj['$and'].push({
                '_dev_id': _dev_id
            });
        }
        if (role) {
            find_obj['$and'].push({
                'role': role
            });
        }
        if (scope) {
            find_obj['$and'].push({
                'scope': scope
            });
        }
        compDevSrv.findCompDev(find_obj, function (err_compDev, res_compDev) {
            if (err_compDev) {
                return callback(err_compDev, null);
            }
            if (res_compDev) {
                var set_obj = {};
                if (percnt !== res_compDev.percnt) {
                    set_obj.percnt = percnt;
                    res_compDev.percnt = percnt;
                }
                if (Object.keys(set_obj).length > 0) {
                    compDevSrv.updateCompDevById(res_compDev._id, set_obj, function (err_upd, res_upd) {
                        if (err_upd) {
                            return callback(err_upd, null);
                        }
                        return callback(null, res_compDev);
                    });
                } else {
                    return callback(null, res_compDev);
                }
            } else {
                var compDev = new CompDevMdl(_comp_id, _dev_id, role, scope, percnt);
                compDevSrv.insertCompDev(compDev, function (err_ins, res_ins) {
                    if (err_ins) {
                        return callback(err_ins, null);
                    }
                    return callback(null, res_ins);
                });
            }
        });
    } catch (err) {
        return callback(err, null);
    }
};
/**
 * [insOrUpdStatus description]
 *
 * @method insOrUpdStatus
 *
 * @param  {[type]}       _comp_id [description]
 * @param  {[type]}       name     [description]
 * @param  {[type]}       target   [description]
 * @param  {[type]}       reached  [description]
 * @param  {Function}     callback [description]
 *
 * @return {[type]}       [description]
 */
exports.insOrUpdStatus = function (_comp_id, name, target, reached, callback) {
    'use strict';
    try {
        var find_obj = {
            '$and': []
        };
        if (_comp_id) {
            find_obj['$and'].push({
                '_comp_id': _comp_id
            });
        }
        if (name) {
            find_obj['$and'].push({
                'name': name
            });
        }
        statusSrv.findStatus(find_obj, function (err_status, res_status) {
            if (err_status) {
                return callback(err_status, null);
            }
            if (res_status) {
                var set_obj = {};
                if (target !== res_status.target) {
                    set_obj.target = target;
                    res_status.target = target;
                }
                if (reached !== res_status.reached) {
                    set_obj.reached = reached;
                    res_status.reached = reached;
                }
                if (Object.keys(set_obj).length > 0) {
                    statusSrv.updateStatusById(res_status._id, set_obj, function (err_upd, res_upd) {
                        if (err_upd) {
                            return callback(err_upd, null);
                        }
                        return callback(null, res_status);
                    });
                } else {
                    return callback(null, res_status);
                }
            } else {
                var status = new StatusMdl(_comp_id, name, target, reached);
                statusSrv.insertStatus(status, function (err_ins, res_ins) {
                    if (err_ins) {
                        return callback(err_ins, null);
                    }
                    return callback(null, res_ins);
                });
            }
        });
    } catch (err) {
        return callback(err, null);
    }
};
/**
 * [updCompDevAndLifCyc description]
 *
 * @method updCompDevAndLifCyc
 *
 * @param  {[type]}            _comp_id   [description]
 * @param  {[type]}            devs       [description]
 * @param  {[type]}            life_cycle [description]
 * @param  {Function}          callback   [description]
 *
 * @return {[type]}            [description]
 */
exports.updCompDevAndLifCyc = function (_comp_id, devs, life_cycle, callback) {
    'use strict';
    try {
        compSrv.findCompById(_comp_id, function (err_comp, res_comp) {
            if (err_comp) {
                return callback(err_comp, null);
            }
            if (res_comp) {
                var set_obj = {};
                if (devs !== res_comp.devs) {
                    set_obj.devs = devs;
                    res_comp.devs = devs;
                }
                if (life_cycle !== res_comp.life_cycle) {
                    set_obj.life_cycle = life_cycle;
                    res_comp.life_cycle = life_cycle;
                }
                if (Object.keys(set_obj).length > 0) {
                    compSrv.updateCompById(res_comp._id, set_obj, function (err_upd, res_upd) {
                        if (err_upd) {
                            return callback(err_upd, null);
                        }
                        return callback(null, res_comp);
                    });
                } else {
                    return callback(null, res_comp);
                }
            } else {
                return callback(null, null);
            }
        });
    } catch (err) {
        return callback(err, null);
    }
};

/**
 * [findCompById description]
 *
 * @method findCompById
 *
 * @param  {[type]}     _id       [description]
 * @param  {[type]}     callback  [description]
 *
 * @return {[type]}     [description]
 */
exports.findCompById = function(_id, callback){
    compSrv.findCompById(_id, function (err_comp, res_comp) {
        if (err_comp) {
            return callback(err_comp, null);
        }
        return callback(null, res_comp);
    });
};

/**
 * [delAllComps description]
 *
 * @method delAllComps
 *
 * @param  {Function}  callback [description]
 *
 * @return {[type]}    [description]
 */
exports.delAllComps = function (callback) {
    'use strict';
    try {
        compSrv.delAllComps(function (err, comps) {
            if (err) {
                return callback(err, null);
            }
            compDevSrv.delAllCompDevs(function (err, comp_devs) {
                if (err) {
                    return callback(err, null);
                }
                statusSrv.delAllStatuses(function (err, statuses) {
                    if (err) {
                        return callback(err, null);
                    }
                    return callback(null, true);
                });
            });
        });
    } catch (err) {
        return callback(err, null);
    }
};

/**
 * [updateCompById description]
 *
 * @method updateCompById
 *
 *
 * @param  {[type]}     _comp_id        [description]
 * @param  {[type]}     _platfrm_id     [description]
 * @param  {[type]}     _suprlay_id     [description]
 * @param  {[type]}     _layer_id       [description]
 * @param  {[type]}     type            [description]
 * @param  {[type]}     description     [description]
 * @param  {[type]}     difficulty      [description]
 * @param  {[type]}     code_level      [description]
 * @param  {[type]}     repo_dir        [description]
 * @param  {[type]}     scrnshts        [description]
 * @param  {[type]}     found           [description]
 * @param  {Function}   callback        [description]
 *
 * @return {[type]}    [description]
 */
exports.updateCompById = function(_comp_id, _platfrm_id, _suprlay_id, _layer_id, name, type, description, difficulty, code_level, repo_dir, scrnshts, found, callback){

    var set_obj = {};
    if (_platfrm_id) {
        set_obj._platfrm_id = _platfrm_id;
    }
    if (_suprlay_id) {
        set_obj._suprlay_id = _suprlay_id;
    }
    if (_layer_id) {
        set_obj._layer_id = _layer_id;
    }
    if (name) {
        set_obj.name = name;
    }
    if (type) {
        set_obj.type = type;
    }
    if (description) {
        set_obj.description = description;
    }
    if (difficulty) {
        set_obj.difficulty = difficulty;
    }
    if (code_level) {
        set_obj.code_level = code_level;
    }
    if (repo_dir) {
        set_obj.repo_dir = repo_dir;
    }
    if (scrnshts) {
        set_obj.scrnshts = scrnshts;
    }
    if (found) {
        set_obj.found = found;
    }

    compSrv.updateCompById(_comp_id, set_obj, function (err, comp) {
        if (err) {
            return callback(err, null);
        }
        return callback(null, comp);
    });


}

/*jshint +W069 */