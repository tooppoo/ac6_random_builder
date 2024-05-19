import {
  notCarrySameUnitInSameSideName,
  notOverEnergyOutputName,
  totalCoamNotOverMaxName,
  totalLoadNotOverMaxName,
} from '~core/assembly/random/validator/validators.ts'

export const enError = {
  assembly: {
    overTryLimit: {
      description: 'Generation aborted because exceeded the limit and failed.',
    },
    [notOverEnergyOutputName]: {
      label: 'lack of EN output',
    },
    [notCarrySameUnitInSameSideName]: {
      label: 'arm or back units are duplicated',
    },
    [totalLoadNotOverMaxName]: {
      label: 'over max COAM',
    },
    [totalCoamNotOverMaxName]: {
      label: 'over max load limit',
    },
    unknown: {
      label: '$t(unknown.label)',
    },
    retry: {
      guide: 'Please retry relaxing conditions.',
    },
  },
  filter: {
    notFound: {
      description:
        'No parts were found available for the specified conditions.',
      guide: 'Please retry relaxing the filtering conditions.',
    },
  },
  unknown: {
    label: 'Unexpected Error',
    description: 'Unexpected Error occurred',
  },
  guideToDevelop:
    'If you would like to report a problem, please report from the following URL.',
}
