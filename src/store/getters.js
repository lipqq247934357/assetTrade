const getters = {
    sidebar: state => state.app.sidebar,
    device: state => state.app.device,
    token: state => state.user.token,
    avatar: state => state.user.avatar,
    name: state => state.user.name,
    roles: state => state.user.roles,
    tree: state => state.user.tree,
    btn: state => state.user.btn,
    userInfo: state => state.user.userInfo,
    menuId: state => state.user.menuId,
    buttonArr: state => state.user.buttonArr,
    btnId: state => state.user.btnId
}
export default getters
