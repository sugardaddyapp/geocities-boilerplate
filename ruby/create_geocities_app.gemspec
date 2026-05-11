require_relative "lib/create_geocities_app/version"

Gem::Specification.new do |spec|
  spec.name        = "create-geocities-app"
  spec.version     = CreateGeocitiesApp::VERSION
  spec.authors     = ["Jamey Baldwin"]
  spec.summary     = "Scaffold a 1990s Geocities-themed static website in seconds"
  spec.description = spec.summary
  spec.homepage    = "https://github.com/sugardaddyapp/geocities-boilerplate"
  spec.license     = "MIT"

  spec.required_ruby_version = ">= 2.7.0"

  spec.metadata["homepage_uri"]    = spec.homepage
  spec.metadata["source_code_uri"] = spec.homepage

  spec.files = Dir["lib/**/*", "bin/*", "templates/**/*", "README.md"]
  spec.bindir        = "bin"
  spec.executables   = ["create-geocities-app"]

  spec.add_dependency "tty-prompt", "~> 0.23"
  spec.add_dependency "pastel",     "~> 0.8"
end
