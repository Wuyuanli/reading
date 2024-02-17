import localForage from 'localforage'

export function setLocalForage(key, data, cb, cb2) {
  localForage.setItem(key, data).then((value) => {
    if (cb) cb(value)
  }).catch(function(err) {
    if (cb2) cb2(err)
  })
}

export function getLocalForage(key, cb) {
  localForage.getItem(key, (err, value) => {
    if(cb) cb(err, value)
  })
}

export function removeLocalForage(key, cb, cb2) {
  localForage.removeItem(key).then(function() {
    if (cb) cb()
  }).catch(function(err) {
    if (cb2) cb2(err)
  })
}

export function clearLocalForage(cb, cb2) {
  localForage.clear().then(function() {
    if (cb) cb()
  }).catch(function(err) {
    if (cb2) cb2(err)
  })
}