import Ember from 'ember';
import GithubUrlPropertievs from 'travis/mixins/github-url-properties';

export default Ember.Controller.extend(GithubUrlPropertievs, {
  repoController: Ember.inject.controller('repo'),
  repoBinding: 'repoController.repo',
  commitBinding: 'build.commit',
  currentUserBinding: 'auth.currentUser',
  tabBinding: 'repoController.tab',
  sendFaviconStateChanges: true,
  currentItemBinding: 'build',

  jobsLoaded: function() {
    var jobs;
    if (jobs = this.get('build.jobs')) {
      return jobs.isEvery('config');
    }
  }.property('build.jobs.@each.config'),

  loading: function() {
    return this.get('build.isLoading');
  }.property('build.isLoading'),

  buildStateDidChange: function() {
    if (this.get('sendFaviconStateChanges')) {
      return this.send('faviconStateDidChange', this.get('build.state'));
    }
  }.observes('build.state')
});
