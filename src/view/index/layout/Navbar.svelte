
<nav class="navbar navbar-expand-lg sticky-top bg-body-tertiary border-bottom border-secondary">
  <div class="container-fluid">
    <a class="navbar-brand" href="/">
      Ⅵ
    </a>
    <div class="navbar-nav ms-auto d-flex flex-row">
      <slot name="random"></slot>
      <slot name="reset-lock"></slot>
      <div class="nav-item dropdown">
        <button class="nav-link dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
          Dropdown
        </button>
        <ul class="dropdown-menu">
          <li><button class="dropdown-item">Action</button></li>
          <li><button class="dropdown-item">Action</button></li>
        </ul>
      </div>
    </div>
  </div>
</nav>
