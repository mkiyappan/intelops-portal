export const experimentValidation = {
    setupName: {
        pattern: 'alpha numeric',
        isValid: false,
        isTouched: false,
        errorMsg: 'Please enter setup name'
    },
    isTrain: {
        pattern: 'alpha numeric',
        isValid: true,
        isTouched: true,
        errorMsg: 'Please enter App name'
    },
    appName: {
        pattern: 'alpha numeric',
        isValid: false,
        isTouched: false,
        errorMsg: 'Please enter App name'
    },
    noOfHits: {
        pattern: 'Number',
        isValid: true,
        isTouched: true,
        errorMsg: 'Please enter No of Hits'
    },
    noOfIterations: {
        pattern: 'Number',
        isValid: true,
        isTouched: true,
        errorMsg: 'Please enter Trial Count'
    },
    agentAddress: {
        pattern: 'IP address validation / dns validation',
        isValid: false,
        isTouched: false,
        errorMsg: 'Please enter Agent Address'
    },
    cpuMin: {
        pattern: 'Number',
        isValid: true,
        isTouched: true,
        errorMsg: 'Please enter Minimum CPU'
    },
    cpuMax: {
        pattern: 'Number',
        isValid: true,
        isTouched: true,
        errorMsg: 'Please enter Minimum CPU'
    },
    memoryMin: {
        pattern: 'Number',
        isValid: true,
        isTouched: true,
        errorMsg: 'Please enter Minimum Memory'
    },
    memoryMax: {
        pattern: 'Number',
        isValid: true,
        isTouched: true,
        errorMsg: 'Please enter Maximum Memeory'
    },
    kustomUrl: {
        pattern: 'URL validaion',
        isValid: false,
        isTouched: false,
        errorMsg: 'Please enter Kustom Url'
    },
    kustomUser: {
        pattern: '',
        isValid: false,
        isTouched: false,
        errorMsg: 'Please enter Kustom User'
    },
    kustomLabel: {
        pattern: 'alpha numeric separate by :',
        isValid: false,
        isTouched: false,
        errorMsg: 'Please enter Kustom Label'
    },
    kustomToken: {
        pattern: 'alpha numeric',
        isValid: false,
        isTouched: false,
        errorMsg: 'Please enter Kustom Token'
    },
    kustomBranch: {
        pattern: '',
        isValid: false,
        isTouched: false,
        errorMsg: 'Please enter Kustom Branch'
    },
    kustomPath: {
        pattern: '',
        isValid: false,
        isTouched: false,
        errorMsg: 'Please enter Kustom Path'
    },
    testUrl: {
        pattern: '',
        isValid: false,
        isTouched: false,
        errorMsg: 'Please enter Test Url'
    },
    testUser: {
        pattern: '',
        isValid: false,
        isTouched: false,
        errorMsg: 'Please enter Test User'
    },
    testToken: {
        pattern: '',
        isValid: false,
        isTouched: false,
        errorMsg: 'Please enter Test Token'
    },
    testBranch: {
        pattern: '',
        isValid: false,
        isTouched: false,
        errorMsg: 'Please enter Test Branch'
    },
    testPath: {
        pattern: '',
        isValid: false,
        isTouched: false,
        errorMsg: 'Please enter Test Path'
    }
}
