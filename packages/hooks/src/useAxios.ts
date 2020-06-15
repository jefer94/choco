/* eslint-disable no-shadow */
/* eslint-disable jsdoc/check-examples */
import { useState, useEffect } from 'react'
import axios from 'axios'


/**
 * @callback FieldSetter
 * @param {object} Event - React event.
 */

/**
 * @typedef {object} Props
 * @property {string} method - Filed key, name and id.
 * @property {string} url - Field type.
 * @property {any} object - Field label.
 * @property {object} headers - Field Placeholder.
 * @property {boolean} wait - Setter.
 */

/**
 * @typedef {object} UseAxios
 * @property {any} data - Filed key, name and id.
 * @property {boolean} loaded - Field type.
 * @property {any} error - Field label.
 */

/**
 * Use axios hook.
 *
 * @param {Props} Props - Properties.
 * @example
 * import React from 'react'
 *
 * function Component() {
 *   const { data, error, loaded } = useAxios({
 *     method: 'get',
 *     url: 'http://localhost:3000'
 *   })
 *   return <></>
 * }
 * @returns {UseAxios} Use axios object.
 */
export function useAxios({ method = 'get', url, object, headers, wait }) {
  const [loaded, setLoaded] = useState(false)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  useEffect(() => {
    /**
     * Execute axios request.
     *
     * @example
     * execute()
     */
    async function execute() {
      try {
        const m = method.toLowerCase()
        const response = m === 'post' || m === 'put' ?
          axios[method](url, object, { headers }) :
          axios[method](url, { headers })

        const { data } = await response
        setData(data)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoaded(true)
      }
    }

    if (!wait) { execute() }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wait, url, method, JSON.stringify(object), JSON.stringify(headers)])

  return { data, loaded, error }
}
