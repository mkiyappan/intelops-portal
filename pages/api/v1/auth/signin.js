const WorkOS = require('@workos-inc/node').default;
const workos = new WorkOS(process.env.WORKOS_API_KEY);

const MagicLink = async (req, res) => {
    const email = req.body.emailValue;
    const { query: { type } } = req;
    if(type === 'enroll') {
        const response = await workos.mfa.enrollFactor({
            type: 'totp',
            issuer: 'Optimizor',
            user: email,
        });
        res.status(200).json(response)
    }
    if(type === 'challenge') {
        const authId = req.body.authId;
        const response = await workos.mfa.challengeFactor({
            authenticationFactorId: authId,
        });
        res.status(200).json(response)
    }
    if(type === 'verify') {
        const authId = req.body.authId;
        const otp = req.body.otp;
        const response = await workos.mfa.verifyFactor({
            authenticationChallengeId: authId,
            code: otp,
          });
        res.status(200).json(response)
    }
    if(type === 'magicLink') {
        const email = req.body.emailValue;
        const session = await workos.passwordless.createSession({
            email,
            type: 'MagicLink',
        });
        const userData = await workos.passwordless.sendSession(session.id);
        res.status(200).json(userData)
    }
    //   const response = await workos.mfa.challengeFactor({
    //     authenticationFactorId: 'auth_factor_01FVYZ5QM8N98T9ME5BCB2BBMJ',
    //   });
    //   const session = await workos.passwordless.createSession({
    //      email,
    //      type: 'MagicLink',
    //   });
    //   await workos.passwordless.sendSession(session.id);
    //   res.redirect(`/verify-email`);
}

export default MagicLink;