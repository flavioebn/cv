export const getFollowersText = (username) => {
  return `
(async () => {
  let followers = [];
  let followings = [];
  let dontFollowMeBack = [];
  let iDontFollowBack = [];

  try {
    console.log('Pegando as informações, ESPERA EU FALAR QUE ACABOU');

    // 1. Descobrir o ID do usuário
    const userQueryRes = await fetch(
      '/web/search/topsearch/?query=${encodeURIComponent(username)}'
    );

    if (!userQueryRes.ok) {
      throw new Error('Erro ao buscar usuário: HTTP ' + userQueryRes.status);
    }

    const userQueryJson = await userQueryRes.json();

    const user = userQueryJson.users
      ?.map((u) => u.user)
      .find((u) => u.username === '${username}');

    if (!user) {
      throw new Error('Não foi possível encontrar o usuário ${username}.');
    }

    const userId = user.pk;
    console.log('Usuário encontrado. ID: ' + userId);

    // 2. Headers necessários
    const csrfToken = document.cookie
      .split('; ')
      .find((row) => row.startsWith('csrftoken='))
      ?.split('=')
      .slice(1)
      .join('=');

    const headers = {
      accept: '*/*',
      'x-asbd-id': '359341',
      'x-csrftoken': csrfToken || '',
      'x-ig-app-id': '936619743392459',
      'x-ig-max-touch-points': '0',
      'x-requested-with': 'XMLHttpRequest',
    };

    // 3. Buscar todas as páginas
    const getAllUsers = async (type) => {
      const users = [];
      let maxId = null;
      let page = 1;
      let hasMore = true;

      while (hasMore) {
        const params = new URLSearchParams({
          count: '12',
          search_surface: 'follow_list_page',
        });

        if (maxId) {
          params.set('max_id', maxId);
        }

        const url =
          '/api/v1/friendships/' +
          userId +
          '/' +
          type +
          '/?' +
          params.toString();

        console.log(
          'Pegando ' +
            (type === 'followers' ? 'seguidores' : 'seguindo') +
            ' - página ' +
            page +
            '...'
        );

        const response = await fetch(url, {
          method: 'GET',
          headers,
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error(
            'Erro ao buscar ' + type + ': HTTP ' + response.status
          );
        }

        const data = await response.json();

        if (data.status !== 'ok') {
          throw new Error(
            'Instagram retornou erro ao buscar ' +
              type +
              ': ' +
              JSON.stringify(data)
          );
        }

        const pageUsers = data.users || [];

        users.push(
          ...pageUsers.map((user) => ({
            username: user.username,
            full_name: user.full_name,
          }))
        );

        console.log(
          'Página ' +
            page +
            ': +' +
            pageUsers.length +
            ' usuários | Total: ' +
            users.length
        );

        maxId = data.next_max_id || null;
        hasMore = data.has_more === true && !!maxId;
        page++;

        if (hasMore) {
          await new Promise((resolve) => setTimeout(resolve, 300));
        }
      }

      return users;
    };

    // 4. Buscar seguidores
    followers = await getAllUsers('followers');
    console.log('Seguidores encontrados: ' + followers.length);
    console.log({ followers });

    // 5. Buscar quem o usuário segue
    followings = await getAllUsers('following');
    console.log('Seguindo encontrados: ' + followings.length);
    console.log({ followings });

    // 6. Quem o usuário segue, mas não segue de volta
    dontFollowMeBack = followings.filter(
      (following) =>
        !followers.some(
          (follower) => follower.username === following.username
        )
    );

    console.log({ dontFollowMeBack });

    // 7. Quem segue o usuário, mas não é seguido de volta
    iDontFollowBack = followers.filter(
      (follower) =>
        !followings.some(
          (following) => following.username === follower.username
        )
    );

    console.log({ iDontFollowBack });

    // 8. Disponibilizar os resultados globalmente
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

    // 9. Finalização
    console.log('Acabou!');
    console.log({ CLICA_COM_O_DA_DIREITA_AQUI });

    window.alert('Acabou! Segue o que ta ali no console agora ->');

    console.log(
      'Clique com o botão direito no objeto acima e escolha Copy object para copiar os resultados e colar na etapa 3.'
    );
  } catch (err) {
    console.error('ERRO:', err);
    window.alert('Ocorreu um erro. Veja os detalhes no console.');
  }
})();
`;
};
