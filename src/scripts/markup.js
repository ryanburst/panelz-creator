const PANELZ_CREATOR_MARKUP = `
    <div class="viewport">
        <div class="viewport__message"></div>
        <div class="viewport__loading">
            <h2>Loading...</h2>
            <i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
        </div>
        <form class="viewport__entry viewport__entry--hidden">
            <h1>Enter the name of your comic to get started.</h1>
            <p class="viewport__entry-error"></p>
            <input type="text" class="viewport__entry-input" name="title" placeholder="Comic Title" />
            <button class="button button--submit viewport__entry-submit" type="submit">
                <span class="button__icon"><i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i></span>
                <span class="button__text">Create Your Comic</span>
            </button>
        </form>
        <form class="viewport__title-bar viewport__title-bar--hidden">
            <input type="text" class="viewport__title-input" placeholder="Comic Title" />
            <button class="button button--submit button--save viewport__title-bar-button" type="submit">
                <span class="button__icon"><i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i></span>
                <span class="button__text">Save Comic</span>
            </button>
            <a href="#" class="button button--alt viewport__title-bar-button" data-view-link>View Comic</a>
        </form>
        <div class="viewport__content viewport__content--hidden">
            <div class="viewport__workspace-navigation workspace-navigation">
                <div class="workspace-navigation__title">Pages</div>
                <ul class="workspace-navigation__list"></ul>
                <div class="workspace-navigation__add">
                    <i class="fa fa-plus workspace-navigation__add-icon"></i>
                    <span>Add Page</span>
                </div>
            </div>
            <div class="viewport__workspace workspace">
                <canvas id="workspace__canvas" class="workspace__canvas" width="100" hieght="100"></canvas>
                <div class="workspace__controls">
                    <ul class="controls controls--edit controls--hidden">
                        <li class="controls__option controls__option--select controls__button--active">
                            <button class="controls__button" data-mode="SELECT_MODE">
                                <i class="fa fa-hand-pointer-o"></i>
                            </button>
                        </li>
                        <li class="controls__option controls__option--draw">
                            <button class="controls__button" data-mode="DRAW_MODE">
                                <i class="fa fa-pencil-square-o"></i>
                            </button>
                        </li>
                        <li class="controls__option controls__option--panels">
                            <button class="controls__button" data-mode="SELECT_MODE" data-menu="panels" disabled>
                                <i class="fa fa-picture-o"></i>
                            </button>
                            <ul class="controls__menu controls__menu--panels">
                                <li class="controls__menu-item">Panel A</li>
                                <li class="controls__menu-item">Panel B</li>
                                <li class="controls__menu-item">Panel C</li>
                                <li class="controls__menu-item">Panel D</li>
                                <li class="controls__menu-item">Panel E</li>
                                <li class="controls__menu-item">Panel F</li>
                                <li class="controls__menu-item">Panel G</li>
                                <li class="controls__menu-item">Panel H</li>
                                <li class="controls__menu-item">Panel I</li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <ul class="controls controls--context controls--hidden">
                    <li class="controls__option">
                        <button class="controls__button controls__button--duplicate" data-mode="SELECT_MODE">
                            <i class="fa fa-clone"></i>
                        </button>
                    </li>
                    <li class="controls__option">
                        <button class="controls__button controls__button--delete" data-mode="SELECT_MODE">
                            <i class="fa fa-trash"></i>
                        </button>
                    </li>
                </ul>
                <div class="upload">
                    <a href="#" class="upload__cancel">Cancel</a>
                    <div class="upload__dropzone">
                        <div class="upload__select">
                            <i class="fa fa-cloud-upload upload__dropzone-icon"></i>
                            <span>Drag and Drop to Upload</span>
                            <span style="font-size: 14px;">or</span>
                            <button class="button button--upload">Select File From Your Computer</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
`;
