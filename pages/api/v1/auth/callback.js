const WorkOS = require('@workos-inc/node').default;
const workos = new WorkOS(process.env.WORKOS_API_KEY);
const clientID = process.env.WORKOS_CLIENT_ID;

const Callback = async (req, res) => {
    const { code } = req.query;
    try {
        const { profile } = await workos.sso.getProfileAndToken({
            code,
            clientID,
        });
        res.redirect(`/callback?email=${profile.email}&code=${code}`);
    } catch (e) {
        console.error('code invalid', e);
        res.redirect('/signin-error');
    }
}

export default Callback;