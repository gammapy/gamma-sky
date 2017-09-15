#!/usr/bin/env python
"""Make gamma-sky.net input data.
"""
import click
import gammasky


@click.group()
def cli():
    """The gamma-sky.net Python cli"""
    pass


@cli.group()
def cat():
    """Dump catalog to JSON"""


@cli.group()
def source():
    """Dump source objects to JSON"""


@cat.command('all')
@click.pass_context
def cat_all(ctx):
    """Dump all catalogs to JSON"""
    ctx.invoke(cat_tev)
    ctx.invoke(cat_3fhl)
    ctx.invoke(cat_3fgl)
    ctx.invoke(cat_snrcat)


@cat.command('tev')
def cat_tev():
    """Dump TeV catalog to JSON"""
    gammasky.make_tev_catalog_data()


@cat.command('3fhl')
def cat_3fhl():
    """Dump 3FHL catalog to JSON"""
    gammasky.make_3fhl_catalog_data()


@cat.command('3fgl')
def cat_3fgl():
    """Dump 3FGL catalog to JSON"""
    gammasky.make_3fgl_catalog_data()


@cat.command('snrcat')
def cat_snrcat():
    """Dump SNRCat catalog to JSON"""
    gammasky.make_snrcat_catalog_data()


@source.command('all')
@click.pass_context
def source_all(ctx):
    """Dump all source objects to JSON"""
    ctx.invoke(source_tev)
    ctx.invoke(source_3fhl)
    ctx.invoke(source_3fgl)


@source.command('tev')
@click.option('--sources', default='all', help='Either "all" or comma-separated string of source IDs')
def source_tev(sources):
    """Dump TeV source objects to JSON"""
    gammasky.make_tev_source_data(sources)


@source.command('3fhl')
@click.option('--sources', default='all', help='Either "all" or comma-separated string of source IDs')
def source_3fhl(sources):
    """Dump 3FHL source objects to JSON"""
    gammasky.make_3fhl_source_data(sources)


@source.command('3fgl')
@click.option('--sources', default='all', help='Either "all" or comma-separated string of source IDs')
def source_3fgl(sources):
    """Dump 3FGL source objects to JSON"""
    gammasky.make_3fgl_source_data(sources)


@cli.command()
def maps():
    """Make map data"""
    gammasky.make_maps_data()


@cli.group()
def fetch():
    """Fetch input data files"""


@fetch.command('cats')
def fetch_cats():
    """Fetch all source catalog files"""
    gammasky.fetch_all_cats()


@fetch.command('maps')
def fetch_maps():
    """Fetch all input files to make maps"""
    gammasky.fetch_all_cats()


@fetch.command('all')
def fetch_all():
    """Fetch all data files"""
    gammasky.fetch_all_data()


@cli.command()
@click.pass_context
def all(ctx):
    """Generate all data for the webpage"""
    ctx.invoke(cat_all)
    ctx.invoke(source_all)
    ctx.invoke(maps)


@cli.command('test-dataset')
@click.option('--sources', default='0')
@click.pass_context
def test_dataset(ctx, sources):
    """Dump all data needed for testing."""
    ctx.invoke(cat_all)
    ctx.forward(source_tev)
    ctx.forward(source_3fhl)
    ctx.forward(source_3fgl)


if __name__ == '__main__':
    import logging

    logging.basicConfig(level=logging.INFO)
    cli()
