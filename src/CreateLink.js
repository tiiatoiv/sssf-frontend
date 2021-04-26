import React from 'react';

const CreateLink = () => {
    const [formState, setFormState] = useState({
      description: '',
      url: ''
    });
  
    const [createLink] = useMutation(ADD_GAMESTAT, {
      variables: {
        gameResult: formState.gameResult,
        agent: formState.agent,
        map: formState.map,
        kills: formState.kills,
        deaths: formState.deaths,
        assist: formState.assist
      },
    });
  
    return (
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createLink();
          }}
        >
          <div className="flex flex-column mt3">
            <input
              className="mb2"
              value={formState.gameResult}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  gameResult: e.target.value
                })
              }
              type="text"
              placeholder="Game result"
            />
            <input
              className="mb2"
              value={formState.agent}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  agent: e.target.value
                })
              }
              type="text"
              placeholder="Agent"
            />
            <input
              className="mb2"
              value={formState.map}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  map: e.target.value
                })
              }
              type="text"
              placeholder="Map"
            />
            <input
              className="mb2"
              value={formState.kills}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  kills: e.target.value
                })
              }
              type="text"
              placeholder="Kills"
            />
            <input
              className="mb2"
              value={formState.deaths}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  deaths: e.target.value
                })
              }
              type="text"
              placeholder="Deaths"
            />
            <input
              className="mb2"
              value={formState.assist}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  assist: e.target.value
                })
              }
              type="text"
              placeholder="Assist"
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  };

  export default CreateLink;