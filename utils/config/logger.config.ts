import Consola from 'consola'

export const createLogger = (prefix: string) =>
  Consola.create({
    defaults: {
      tag: prefix + ':',
    },
  })
