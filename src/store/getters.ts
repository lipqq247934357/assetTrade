const getters = {
    sidebar: (state: any) => state.app.sidebar,
    device: (state: any) => state.app.device,
    token: (state: any) => state.user.token,
    avatar: (state: any) => state.user.avatar,
    name: (state: any) => state.user.name,
    roles: (state: any) => state.user.roles,
    tree: (state: any) => state.user.tree,
    btn: (state: any) => state.user.btn,
    userInfo: (state: any) => state.user.userInfo,
    menuId: (state: any) => state.user.menuId,
    buttonArr: (state: any) => state.user.buttonArr,
    btnId: (state: any) => state.user.btnId
}
export default getters
