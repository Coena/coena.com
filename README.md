Coena.com website
=======================

# Core technologies

* [Yeoman](http://yeoman.io/) - Scaffolding tool for modern web applications.
* [Grunt](http://gruntjs.com/) - JavaScript task runner.
* [Bower](http://bower.io/) - A package manager for the web.
* [Modernizr](http://modernizr.com/) - Detects HTML5 and CSS3 features in the browser.
* [Bootstrap](http://getbootstrap.com/) - Developing responsive, mobile first projects on the web.
* [JQuery](http://jquery.com//) - Write less, do more.

# Getting started

## Tool installation

### OSX

#### Homebrew package manager

First, install Homebrew.

```bash
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

Then, ````brew update```` to ensure your Homebrew is up to date.

```bash
brew update
```

As a safe measure, run ````brew doctor```` to make sure your system is ready to brew. Follow any recommendations from brew doctor.

```bash
brew doctor
```

Next, add the Homebrew location to your ````$PATH````

Create or edit ````~/.bash_profile````

```bash
export PATH="/usr/local/bin:$PATH"
```

Then, source your profile file after adding/saving

```bash
. ~/.bash_profile
```

#### NPM Node.js package manager

Install Node (npm will be installed with node)

```bash
brew install node
```

#### Ruby and Compass

Ruby should be available, make sure it is installed

```bash
ruby -version
```

Next, install Compass

```bash
sudo gem install compass
```

### All platforms

#### Yeoman

Install Yeoman, this should also install Grunt and Bower but it doesn't so let's be explicit.

```bash
npm install -g yo
npm install -g grunt-cli
npm install -g bower
```

Install some generators.

```bash
npm install -g generator-webapp
```

#### Getting the code

With proper SSH setup

```bash
git clone git@github.com:Coena/coena.com.git
```

Less optimal, will ask for GitHub username/password

```bash
git clone https://github.com/Coena/coena.com.git
```

Next, cd to the newly checked out folder

```bash
cd coena.com
```

#### Download all dependencies

Every time a new dependency is added, use ````npm install```` and ````bower install```` to install modules and download dependencies into````app/bower_components````

```bash
npm install
bower install
```

## Running the application

Use Grunt to run the application.

```bash
grunt serve
```

The application starts on [http://localhost:9000](http://localhost:9000)

## Running tests and making a release

The easiest way to run all tests and make a build is by using the default Grunt task.

```bash
grunt
```