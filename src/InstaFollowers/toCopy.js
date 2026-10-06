export const getFollowersText = (username) => {
  return `
  let followers = [];
let followings = [];
let dontFollowMeBack = [];
let iDontFollowBack = [];

(async () => {
  try {
    console.log('Pegando as informações, ESPERA EU FALAR QUE ACABOU');

    // ============================================================
    // 1. Descobrir o ID do usuário
    // ============================================================

    const userQueryRes = await fetch(
      '/web/search/topsearch/?query=flavioebn'
    );

    const userQueryJson = await userQueryRes.json();

    const user = userQueryJson.users
      .map((u) => u.user)
      .find((u) => u.username === "flavioebn");

    if (!user) {
      throw new Error("Não foi possível encontrar o usuário flavioebn.");
    }

    const userId = user.pk;

    console.log('Usuário encontrado. ID: ${userId}');

    // ============================================================
    // Headers necessários para a API atual do Instagram
    // ============================================================

    const csrfToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("csrftoken="))
      ?.split("=")[1];

    const headers = {
      accept: "*/*",
      "x-asbd-id": "359341",
      "x-csrftoken": csrfToken || "",
      "x-ig-app-id": "936619743392459",
      "x-ig-max-touch-points": "0",
      "x-requested-with": "XMLHttpRequest",
    };

    // ============================================================
    // Função genérica para buscar uma lista inteira
    // ============================================================

    const getAllUsers = async (type) => {
      let users = [];
      let maxId = null;
      let page = 1;
      let hasMore = true;

      while (hasMore) {
        let url =
          '/api/v1/friendships/${userId}/${type}/?count=12&search_surface=follow_list_page';

        if (maxId) {
          url += `&max_id=${encodeURIComponent(maxId)}`;
        }

        console.log(
          'Pegando ${type === "followers" ? "seguidores" : "seguindo"} - página ${page}...'
        );

        const response = await fetch(url, {
          method: "GET",
          headers,
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(
            'Erro ao buscar ${type}: HTTP ${response.status}'
          );
        }

        const data = await response.json();

        if (data.status !== "ok") {
          throw new Error(
            'Instagram retornou erro ao buscar ${type}: ${JSON.stringify(data)}'
          );
        }

        const pageUsers = data.users || [];

        users = users.concat(
          pageUsers.map((user) => ({
            username: user.username,
            full_name: user.full_name,
          }))
        );

        console.log(
          'Página ${page}: +${pageUsers.length} usuários | Total: ${users.length}'
        );

        maxId = data.next_max_id || null;
        hasMore = data.has_more === true && !!maxId;

        page++;

        // Pequena pausa para evitar fazer centenas de requests
        // instantaneamente.
        if (hasMore) {
          await new Promise((resolve) => setTimeout(resolve, 300));
        }
      }

      return users;
    };

    // ============================================================
    // 2. Pegar seguidores
    // ============================================================

    followers = await getAllUsers("followers");

    console.log('Seguidores encontrados: ${followers.length}');
    console.log({ followers });

    // ============================================================
    // 3. Pegar quem você segue
    // ============================================================

    followings = await getAllUsers("following");

    console.log('Seguindo encontrados: ${followings.length}');
    console.log({ followings });

    // ============================================================
    // 4. Quem você segue mas não segue você
    // ============================================================

    dontFollowMeBack = followings.filter((following) => {
      return !followers.find(
        (follower) => follower.username === following.username
      );
    });

    console.log({
      dontFollowMeBack,
    });

    // ============================================================
    // 5. Quem segue você mas você não segue
    // ============================================================

    iDontFollowBack = followers.filter((follower) => {
      return !followings.find(
        (following) => following.username === follower.username
      );
    });

    console.log({
      iDontFollowBack,
    });

    // ============================================================
    // 6. Disponibilizar tudo globalmente
    // ============================================================

    window.followers = followers;
    window.followings = followings;
    window.dontFollowMeBack = dontFollowMeBack;
    window.iDontFollowBack = iDontFollowBack;

    const CLICA_COM_O_DA_DIREITA_AQUI = {
      followers,
      followings,
      dontFollowMeBack,
      iDontFollowBack,
    };

    window.CLICA_COM_O_DA_DIREITA_AQUI =
      CLICA_COM_O_DA_DIREITA_AQUI;

    // ============================================================
    // 7. Finalização
    // ============================================================

    window.alert("Acabou! Segue o que ta ali no console agora ->");

    console.log('Acabou!');

    console.log({
      CLICA_COM_O_DA_DIREITA_AQUI,
    });

    console.log(
      'Clica aqui na linha de cima com o botão da direita e clica em copiar objeto/copy object pra pegar os resultados, e volta pro meu site pra colar eles na etapa 3'
    );
  } catch (err) {
    console.error("ERRO:", err);
    console.log({
      err,
    });
  }
})();
  `;
};
