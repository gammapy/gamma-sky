"""Make gamma-sky.net input data.
"""
import click
import gammasky

@click.group()
def cli():
    """The gamma-sky.net Python cli"""
    pass

@cli.command()
def catalog():
    """Make catalog data"""
    gammasky.make_3fgl_catalog_data()
    gammasky.make_2fhl_catalog_data()
    gammasky.make_snrcat_catalog_data()


@cli.command()
def maps():
    """Make map data"""
    gammasky.make_maps_data()

if __name__ == '__main__':
    cli()
